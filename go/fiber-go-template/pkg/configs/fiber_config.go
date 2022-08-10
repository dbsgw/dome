package configs

import (
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

// FiberConfig func for configuration Fiber app.
// See: https://docs.gofiber.io/api/fiber#config
func FiberConfig() fiber.Config {
	// 定义服务器设置。
	// os.Getenv("SERVER_READ_TIMEOUT")：获取环境变量SERVER_READ_TIMEOUT 的
	// strconv.Atoi 转成 int
	readTimeoutSecondsCount, _ := strconv.Atoi(os.Getenv("SERVER_READ_TIMEOUT"))

	// Return Fiber configuration.
	// 返回光纤配置
	// fiber.Config是 fiber框架的配置 ，定义读取超时时间
	return fiber.Config{
		ReadTimeout: time.Second * time.Duration(readTimeoutSecondsCount),
	}
}
