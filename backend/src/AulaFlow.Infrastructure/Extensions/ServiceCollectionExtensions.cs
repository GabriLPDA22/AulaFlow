using AulaFlow.Application.AssistantSettings;
using AulaFlow.Application.Auth;
using AulaFlow.Application.Businesses;
using AulaFlow.Application.Conversations;
using AulaFlow.Application.Knowledge;
using AulaFlow.Application.Leads;
using AulaFlow.Application.Widget;
using AulaFlow.Infrastructure.Data;
using AulaFlow.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AulaFlow.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IBusinessService, BusinessService>();
        services.AddScoped<ILeadService, LeadService>();
        services.AddScoped<IConversationService, ConversationService>();
        services.AddScoped<IKnowledgeService, KnowledgeService>();
        services.AddScoped<IAssistantSettingsService, AssistantSettingsService>();
        services.AddScoped<IWidgetService, WidgetService>();

        return services;
    }
}
