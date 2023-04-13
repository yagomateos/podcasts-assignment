<h2>Instalación</h2><br>
Previamente antes de ejecutar es necesario instalar las siguientes dependencias:

- npm install react-bootstrap
- npm install bootstrap
- npm instal react-router-dom
- npm install node-fetch
- npm install react-audio-player

El programa se puede ejecutar con el comando "npm run dev" para ejecutarse en modo de desarrollo y con el comando "npm run prod" para ejecutarse en modo de producción.

<h2>COMO FUNCIONA</h2><br>

<p>En este caso index.js contiene el header y PodcastList. El header es unicamente la navbar superior que pone podcaster. El PodcastList contiene la barra de filtrado de los podcast. Esta barra de filtrado funciona usando el array de objetos podcast que se tiene en la pestaña y filtra acorde lo que se introduce por parte del usuario. Luego, a mayores tiene una llamada a un componente Podcast por cada podcast en ese mismo array.</p>

<p>Esto funciona de la misma manera que en anterior proyecto funcionaban las prendas de ropa de mayoral. Este objeto Podcast es un display del podcast con un elemento Link que lo contiene, con una ruta especificada tal que “podcast/${podcastId}”, lo que te redireccionara a la pestaña especifica del podcast que clickes.</p>

<p>El podcastId se indica así en la url porque es un elemento variable ya que según el podcast que se clicke varía. En esta nueva pestaña de podcsst tenemos la informacion relativa al podcsst, se consulta o a la API o a local storage. Para la informacion especifica de un podcast se hace una llamada a una ruta definida en la carpeta pages/api.</p>

<p>A diferencia de como se hace en index.js, aqui se hace así para evitar el error de CORS que daría, ya que de esta forma la solicitud la hacemos desde el servidor y si no lo hiciesemos así, seria desde el cliente. A la izquierda esta el display del podcast con sus datos obtenidos de la API de itunes de podcast y a la derecha sus episodios. Todos provenientes del mock.js, un archivo localizado en la carpeta pages/api que simula una posible respuesta de la API que no nos proporcionaron.</p>
<p>Se mapean sus datos y se displayean como para cualquier json. Por último si clickas en un episodio tiene el mismo enrutado que para un podcast pero para el episodio, siguiendo la misma refla de {episodeId} para la ruta variable. Luego en la ventana del episodio se displayean los datos obtenidos del archivo</p>