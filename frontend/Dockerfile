# -----------------------------------------------------------------------------
# ETAPA 1: Construcción del Frontend (Node.js 20 + pnpm)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Habilitar pnpm e instalar dependencias
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# Copiar el código fuente y compilar los archivos estáticos de producción
COPY . .
RUN pnpm run build

# -----------------------------------------------------------------------------
# ETAPA 2: Servidor Web de Producción (Nginx)
# -----------------------------------------------------------------------------
FROM nginx:alpine AS final

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos compilados (dist/) desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]