var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseJAH("ws-mitbudget");

app.UseStatusCodePages();

if (!app.Environment.IsDevelopment()) {
  app.UseDomainRedirection("mit-budget.dk");
  app.UseHttpsRedirection();
} else {
  app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();

app.Map("/api/budget", MitBudgetAPI.ProcReq);
app.Map("/api/budget/{id}", MitBudgetAPI.ProcReq);

app.UseSpirit();
app.MapPlausible();

app.Run();
