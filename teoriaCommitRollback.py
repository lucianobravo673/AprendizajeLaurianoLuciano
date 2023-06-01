import psycopg2 as db #Importamos el módulo psycopg2, y lo renombramos como db para usarlo en el módulo.

#Creamos la conexión con la base de datos, usando el método .connect, y el alias de psycopg2
conexion = db.connect(user = 'postgres', password = 'admin', host = 'localhost', port = '5432', dbname = 'practicaPython')

try: #El bloque try, intenta de realizar una serie de acciones a la base de datos
    punteroBD = conexion.cursor() #creamos y definimos un cursor

    #Creamos la instrucción SQL, con la tupla de los datos que vamos a agregar
    sqlNuevo = 'INSERT INTO persona(nombre, dni, direccion, email) VALUES(%s, %s, %s, %s)'
    tuplaDatos = ('Persona de Prueba', '123654789', 'calleFalsa1234', 'pPrueba@gmail.com')
    
    #Ejecutamos la sentencia sql mediante el cursor
    punteroBD.execute(sqlNuevo, tuplaDatos)

    #Hacemos efectiva la transacción, y mostramos un mensaje por pantalla
    conexion.commit()
    print(f'Está realizada la transacción')

except Exception as error: #Bloque except, que maneja las excepciones, o los errores
    
    #Si hubiera errores, volvemos para atrás con la transacción, y mostramos un mensaje en pantalla
    conexion.rollback()
    print(f'Ocurrió un error en la ejecución del programa {error}')

finally: #Bloque finally que se ejecuta siempre
    conexion.close()
    
#LO IMPORTANTE A DESTACAR EN TODO ESTO, ES QUE CUANDO EMPLEAMOS LA SENTENCIA DE TIPO WITH, AUTOMÁTICAMENTE SE HACE
#COMMIT Y ROLLBACK Y TERMINA SIENDO INNECESARIO HACERLO EXPLÍCITAMENTE
