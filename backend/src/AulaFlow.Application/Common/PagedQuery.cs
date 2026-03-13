namespace AulaFlow.Application.Common;

public class PagedQuery
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;

    public int Skip => (Page - 1) * PageSize;
}
