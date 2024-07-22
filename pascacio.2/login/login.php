<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "pascacio";

    // Conexión a la base de datos
    $coneccion = mysqli_connect($servidor, $usuario, $clave, $bd);

    if (!$coneccion) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    // Obtener los datos del formulario
    $nombres = $_POST['nombres'];
    $user_name = $_POST['user_name'];
    $confi = $_POST['persona_confianza_select'];
    $colegio = $_POST['colegio'];
    $latitud = $_POST['latitud'];
    $longitud = $_POST['longitud'];

    // Escapar los datos para evitar inyección SQL
    $nombres = mysqli_real_escape_string($coneccion, $nombres);
    $user_name = mysqli_real_escape_string($coneccion, $user_name);
    $confi = mysqli_real_escape_string($coneccion, $confi);
    $colegio = mysqli_real_escape_string($coneccion, $colegio);
    $latitud = mysqli_real_escape_string($coneccion, $latitud);
    $longitud = mysqli_real_escape_string($coneccion, $longitud);

    // Consulta para insertar datos
    $insertar = "INSERT INTO usuarios (nombre, user_name, confi, colegio, latitud, longitud) VALUES ('$nombres', '$user_name', '$confi', '$colegio', '$latitud', '$longitud')";

    // Ejecutar la consulta y verificar
    if (mysqli_query($coneccion, $insertar)) {
        // Enviar respuesta JSON
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => mysqli_error($coneccion)]);
    }

    // Cerrar conexión
    mysqli_close($coneccion);
    exit();
}
?>

