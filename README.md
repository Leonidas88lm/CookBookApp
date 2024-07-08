# CookBookApp

Proyecto grupal realizado con fines educativos como parte de un trabajo practico para la catedra de Introduccion al Desarrollo de Software de Camejo.

CookBookApp:
CookBookApp es una aplicación web colaborativa donde los usuarios pueden ver recetas ya definidas y nuevas creadas por el usuario, asi como registrarse, iniciar sesión y crear nuevas recetas. La plataforma permite ademas administras la lista de recetas creadas como haci tambien editarlas.

Tecnologías Utilizadas
    Frontend:
        HTML: Estructura del contenido.
        CSS: Estilos y diseño de la página.
        JavaScript: Interactividad y lógica del lado del cliente.

    Backend:
        Python: Lenguaje de programación del servidor.
        Flask: Framework web para el desarrollo del servidor.
        Request: Librería para manejar solicitudes HTTP.
        JSONify: Convertir datos en formato JSON para el intercambio de información.
        SQLalchemy: 
        CORS: Manejo de solicitudes entre dominios.
        PostgreSQL: Base de datos relacional para almacenar información de usuarios y recetas.

Instalación:
    Para configurar el proyecto en tu máquina local, sigue estos pasos:
        Clona el repositorio en bash:
        Copiar código:
            git clone https://github.com/intro-camejo/tp0-Leonidas88lm.git
            cd CookBookApp

Crea un entorno virtual (opcional pero recomendado):
    En bash Copiar código:
        python -m venv venv
        source venv/bin/activate  # En Windows: venv\Scripts\activate

Asegúrate de tener PostgreSQL instalado.
Crea una base de datos nueva para el proyecto.
Configura las variables de entorno para tu base de datos en un archivo .env siguiendo el archivo de ejemplo .env.example.

Ejecuta las migraciones en bash:
Copiar código:
    flask db upgrade

Inicia la aplicación en bash:
Copiar código:
    flask run
La aplicación estará disponible en http://localhost:5000

Uso:
    Registro e Inicio de Sesión:
        Los usuarios pueden registrarse y acceder a la aplicación usando el formulario de inicio de sesión.

    Creación de Recetas:
        Los usuarios autenticados pueden crear nuevas recetas proporcionando un título, ingredientes y pasos de preparación.

    Exploración de Recetas:
        Los usuarios pueden explorar recetas publicadas por otros y buscar recetas según sus preferencias.

Autores:
    Gonzalo Gustavo 
    Gonzalo Agustin Weber
    Leonel Ezequiel Gonzalez 

Contacto:
    Para preguntas o sugerencias, puedes contactarnos en leonelezequielg@gmail.com