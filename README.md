# E-commerce
![photo-1](https://user-images.githubusercontent.com/84878388/155735040-a13377c0-3f7a-47a3-bf8e-7a0b818148da.jpg)

Esta aplicación está hecha con Angular, tiene una temática e-commerce, pero no tiene pasarela de pago aun, está compuesta por cinco páginas, una como la principal, una para cada categoría, una para cada producto, una para el carrito y una como 404. Usa NgRx como manejador de estado, para mayor comodidad, también usa RxJs para manipular los datos en forma de observables como en el caso de los filtros, personalmente creo que esta fue la parte que más me costó aprender porque estaba muy acostumbrado a las promesas, pero me gusto 
implementarlo. Tiene tres servicios uno para hacer uso de la api, otro para setear el uso del spinner y otro para guardar el token el local storage.

![photo-2](https://user-images.githubusercontent.com/84878388/155736081-eb1767da-7551-4132-ad2a-46017a812fc8.jpg)

Los formularios para el login y para registrarse son formularios reactivos, para poder registrarse o loggearse primero se tiene que pasar por las validaciones de estos, una vez pasen la validación serán enviados hacia la api para ser utilizados dependiendo de los requerimientos.

![photo 3](https://user-images.githubusercontent.com/84878388/155736117-4ceaf04f-8e5e-4903-a3e3-ab2b2cde867b.jpg)

La api está hecha con Node y Express, los usuarios y los productos están guardados en una base en MySQL, se utiliza JWT para guardar la session, se emite un token que dura un día, este es enviado a una ruta especifica para validar el token, si el token está vencido la aplicación le pedirá al usuario volver a registrarse para poder agregar productos al carrito, pero mientras este sea válido el usuario podrá usar la aplicación sin tener que volver a ingresar sus credenciales.

En el registro para encriptar la contraseña se utiliza sha256, una función propia y la librería faker como salt introduciendo el nombre de una calle al azar. También para el caso de desencriptar la contraseña para poder validarla con la ingresada por el cliente. También se utiliza la librería uuid para agregarle un id al usuario.

Viéndolo en perspectiva creo que este es el proyecto que más tiempo me llevo de todos, fue un proyecto que por momentos me cansaba, pero disfrute mucho haciéndolo y aprendí aun más. Desde que inicie con JavaScript quería llegar a tener los conocimientos para hacer algo parecido y, aunque le faltan varias features, tener más o menos una idea de como funcionaban los e-commerces que uno visita a diario.
