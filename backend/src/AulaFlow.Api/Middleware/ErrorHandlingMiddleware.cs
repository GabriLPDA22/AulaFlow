using System.Net;
using System.Text.Json;

namespace AulaFlow.Api.Middleware;

public class ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, type, message) = exception switch
        {
            KeyNotFoundException => (HttpStatusCode.NotFound, "not_found", exception.Message),
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "unauthorized", exception.Message),
            InvalidOperationException => (HttpStatusCode.Conflict, "conflict", exception.Message),
            ArgumentException => (HttpStatusCode.BadRequest, "bad_request", exception.Message),
            _ => (HttpStatusCode.InternalServerError, "server_error", "Ha ocurrido un error inesperado")
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var response = JsonSerializer.Serialize(new
        {
            type,
            message
        }, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

        return context.Response.WriteAsync(response);
    }
}
