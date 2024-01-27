var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
JAH.App = app;

app.UseStatusCodePages();

if (app.Environment.IsDevelopment()) {
  app.UseDeveloperExceptionPage();
} else { 
  app.UseSeq("hEqf13BOdDuA13HJSSC5");
  app.UseDomainRedirection("mit-budget.dk");
}
app.UseFrackStatic();
app.Map("/api/budget", MitBudgetAPI.ProcReq);
app.Map("/api/budget/{id}", MitBudgetAPI.ProcReq);
app.UseStaticFiles();
app.UsePlausible();


app.Run();
