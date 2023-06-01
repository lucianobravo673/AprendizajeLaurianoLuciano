import psycopg2 as db #Importamos el módulo psycopg2, y lo renombramos como db para usarlo en el módulo.

#Creamos la conexión con la base de datos, usando el método .connect
conexion = db.connect(user = 'postgres', password = 'admin',host = 'localhost', port = '5432', dbname = 'practicaPython')

try: #El bloque try, intenta de realizar una serie de acciones
    confirmacion = input("Que desea hacer en la base de datos ")

    if(confirmacion =="Agregar" or confirmacion =="agregar"):
        with conexion: #Renombramos la conexión como conn para abreviar
            with conexion.cursor() as punteroDB:

                #Pedimos datos como entrada al sistema
                nombre = input("Nombre y Apellido ")
                dni = input("DNI ")
                direccion = input("Direccion ")
                email = input("e-Mail ")


                #Escribimos la instrucción de lo que vamos a realizar en la base de datos
                sqlNuevo = 'INSERT INTO persona(nombre, dni, direccion, email) VALUES(%s, %s, %s, %s)'

                #Realizamos una tupla con los datos que pedimos como entrada
                datosTupla = (nombre, dni, direccion, email)

                #Ejecutamos la instrucción mediante el cursor, o puntero, pasandole la tupla de datos
                punteroDB.execute(sqlNuevo, datosTupla)

                #Vamos a contar la cantidad de registros que se hagan por uso del sistema
                registros = punteroDB.rowcount
                print(f'registros insertados: {registros}')
    elif(confirmacion == "Eliminar" or confirmacion == "eliminar"):
        with conexion:
            with conexion.cursor() as punteroDB:
                eliminar = input("Desea eliminar todos los registros? ")
                if (eliminar == "Si" or eliminar == "si"):
                    sqlBorrar = 'DELETE FROM persona'
                    punteroDB.execute(sqlBorrar)
    elif(confirmacion == "Leer" or confirmacion == "leer"):
        with conexion:
            with conexion.cursor() as punteroDB:
                sqlLeer = 'SELECT * FROM persona'
                punteroDB.execute(sqlLeer)
                registros = punteroDB.fetchall()
                print (registros)
    elif(confirmacion == "Modificar" or confirmacion == "modificar"):
        with conexion:
            with conexion.cursor() as punteroDB:
                persona = input("A qué persona desea modificar? ")
                
                #Pedimos datos como entrada al sistema
                nombre = input("Nombre y Apellido ")
                dni = input("DNI ")
                direccion = input("Direccion ")
                email = input("e-Mail ")

                sqlModificar = 'UPDATE persona SET nombre=%s, dni=%s, direccion=%s, email=%s WHERE persona.dni = %s'

                datosTupla = (nombre, dni, direccion, email, persona)
                punteroDB.execute(sqlModificar, datosTupla)
                registros = punteroDB.rowcount
                print(f'registros insertados: {registros}')
except Exception as error:
    print(f'Ocurrió un error en la ejecución del programa {error}')
finally:
    conexion.close()
