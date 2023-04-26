# Seleccionar la versión de Node que quieres utilizar
FROM node:18.15.0

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar los archivos de la aplicación al directorio de la aplicación
COPY . /app

# Instalar las dependencias de la aplicación
RUN npm install

# Construir la aplicación
RUN npm run build --prod

# Exponer el puerto de la aplicación
EXPOSE 4200

# Iniciar la aplicación
CMD ["npm", "start"]