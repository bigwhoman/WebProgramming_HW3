package main

import (
	"LRUCache/Cache"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

var mu = sync.RWMutex{}
var cache Cache.LRUCache

func main() {
	viper.SetConfigName("config")
	viper.SetConfigType("env")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err != nil {
		fmt.Println(err)
		return
	}
	capacity, _ := strconv.Atoi(viper.GetString("CAPACITY"))
	port := viper.GetString("PORT")
	log.Println(capacity, port)
	cache = Cache.New(uint64(capacity))
	router := gin.Default()
	router.GET("/get", getHandler)
	router.POST("/add", postHandler)
	router.DELETE("/clear", clear)
	router.PUT("/set", set)
	router.GET("/cap", cap)
	router.GET("/size", size)
	router.Run(":" + port)
}

func size(c *gin.Context) {
	go func() {
		mu.Lock()
		c.JSON(http.StatusOK, gin.H{"size": cache.Size()})
		mu.Unlock()
	}()
}
func cap(c *gin.Context) {
	go func() {
		mu.Lock()
		c.JSON(http.StatusOK, gin.H{"capacity": cache.Cap()})
		mu.Unlock()
	}()
}
func getHandler(c *gin.Context) {
	go func(key interface{}) {
		mu.Lock()
		value, ok := cache.GetValue(key)
		mu.Unlock()
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": value})
			return
		}
		c.JSON(http.StatusOK, value)
	}(c.Query("key"))
}
func clear(c *gin.Context) {
	go func() {
		err := cache.Clear()
		if err == nil {
			c.JSON(http.StatusOK, "")
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}()
}
func postHandler(c *gin.Context) {
	key := c.Query("key")
	value := c.Query("value")
	go func(key, value interface{}) {
		mu.Lock()
		err, ok := cache.Add(key, value)
		mu.Unlock()
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, err)
	}(key, value)
}

func set(c *gin.Context) {
	key := c.Query("key")
	value := c.Query("value")
	go func(key, value interface{}) {
		mu.Lock()
		err, ok := cache.SetValue(key, value)
		mu.Unlock()
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": err})
			return
		}
		c.JSON(http.StatusOK, err)
	}(key, value)
}
