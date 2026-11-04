# -----------------------------------------------------------------------------
# ETAPA 1: Construcción (SDK de .NET 8)
# -----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar el archivo de proyecto y restaurar dependencias
COPY ["SpeedRaceEngine.Api/SpeedRaceEngine.Api.csproj", "SpeedRaceEngine.Api/"]
RUN dotnet restore "SpeedRaceEngine.Api/SpeedRaceEngine.Api.csproj"

# Copiar todo el código fuente del backend y compilar en modo Release
COPY . .
WORKDIR "/src/SpeedRaceEngine.Api"
RUN dotnet publish "SpeedRaceEngine.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# -----------------------------------------------------------------------------
# ETAPA 2: Imagen de Producción (Runtime liviano de .NET 8)
# -----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Exponer el puerto de la Web API
EXPOSE 5121
ENV ASPNETCORE_URLS=http://+:5121

ENTRYPOINT ["dotnet", "SpeedRaceEngine.Api.dll"]