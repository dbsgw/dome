package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// FiberMiddleware provide Fiber's built-in middlewares.
// See: https://docs.gofiber.io/api/middleware
func FiberMiddleware(a *fiber.App) {
	// 跨域和路由日志 中间件  都是fiber官方定义好的
	a.Use(
		// Add CORS to each route.
		// 跨域
		cors.New(),
		// Add simple logger.
		// 日志  路由日志
		logger.New(),
	)
}
