package Cache

import (
	"container/list"
)

const (
	KeyNotFound     = "Key doesn't exist"
	KeyAlreadyExist = "Key already exits"
	ValueTooLong    = "Length must be less than 2048"
	KeyTooLong      = "Length must be less than 64"
)

type pair struct {
	key   interface{}
	value interface{}
}

type LRUCache interface {
	Clear() interface{}
	GetValue(key interface{}) (interface{}, bool)
	SetValue(key, value interface{}) (string, bool)
	Resize(size uint64)
	Cap() uint64
	Size() uint64

	Add(key, value interface{}) (string, bool)
}

type cache struct {
	capacity  uint64
	list      *list.List
	keyToItem map[interface{}]*list.Element
}

func (this *cache) Size() uint64 {
	return uint64(this.list.Len())
}
func (this *cache) Cap() uint64 {
	return this.capacity
}

func (this *cache) Clear() (err interface{}) {
	defer func() {
		if r := recover(); r != nil {
			err = r
		}
		err = nil
	}()
	this.keyToItem = make(map[interface{}]*list.Element)
	this.list.Init()
	return nil
}

func (this *cache) GetValue(key interface{}) (interface{}, bool) {
	if element, ok := this.keyToItem[key]; ok {
		this.list.Remove(element)
		this.list.PushFront(element)
		return element.Value.(*pair).value, true
	} else {
		return KeyNotFound, false
	}
}

func (this *cache) SetValue(key, value interface{}) (string, bool) {
	if element, ok := this.keyToItem[key]; ok {
		this.list.Remove(element)
		p := element.Value.(*pair)
		p.value = value
		this.list.PushFront(element)
		return "", ok
	} else {
		return KeyNotFound, false
	}
}

func (this *cache) Add(key, value interface{}) (string, bool) {
	if err, ok := checkLength(key, value); !ok {
		return err, false
	}
	if _, ok := this.keyToItem[key]; !ok {
		for uint64(this.list.Len()) >= this.capacity {
			last := this.list.Back()
			delete(this.keyToItem, last.Value.(*pair).key)
			this.list.Remove(last)
		}
		element := &list.Element{
			Value: &pair{
				value: value,
				key:   key,
			},
		}
		this.list.PushFront(element)
		this.keyToItem[key] = element
		return "", ok
	}
	return KeyAlreadyExist, false
}

func (this *cache) Resize(size uint64) {
	for size < uint64(this.list.Len()) {
		last := this.list.Back()
		delete(this.keyToItem, last.Value.(*pair).key)
		this.list.Remove(last)
	}
	this.capacity = size
}

func New(capacity uint64) *cache {
	return &cache{
		capacity:  capacity,
		list:      list.New(),
		keyToItem: make(map[interface{}]*list.Element),
	}
}

func checkLength(key, value interface{}) (string, bool) {
	switch key.(type) {
	case string:
		if len(key.(string)) > 64 {
			return KeyTooLong, false
		}
	}
	switch value.(type) {
	case string:
		if len(value.(string)) > 2048 {
			return ValueTooLong, false
		}
	}
	return "", true
}
