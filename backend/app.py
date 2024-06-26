from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Receta, Usuario, RecetaCreada
from sqlalchemy import desc, asc
import random

app = Flask(__name__)
CORS(app)
port = 5000



# En app.config esta configurado para que ingrese a mi base de datos. Cambiar segun tus datos de tu base de datos.
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://weber:13465@localhost:5432/pagina_web_tp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def Api():
    return """
    <h1>Api Recetas!'</h1>
    <a href=http://localhost:5000/recetas/> Recetas
    """



# URL -> Te devuelve todas las recetas.
@app.route('/recetas/', methods=['GET'])
def recetas():
    try:
        recetas = Receta.query.all()   
        datos_receta = []
        for receta in recetas:
            dato_receta = {
                'id':receta.id,
                'nombre':receta.nombre,
                'descripcion':receta.descripcion, 
                'imagen':receta.imagen,
                'tipo_plato':receta.tipo_plato,
                'dificultad':receta.dificultad,
                'calorias':receta.calorias,
                'tiempo_preparacion':receta.tiempo_preparacion,
                'alto_proteinas':receta.alto_proteinas,
                'bajo_carbohidratos':receta.bajo_carbohidratos,
                'apto_vegano':receta. apto_vegano,
                'apto_celiaco':receta.apto_celiaco, 
                'apto_lactosa':receta.apto_lactosa
            }
            datos_receta.append(dato_receta)
        return jsonify({'recetas': datos_receta}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'Error'}), 500

# URL -> Te devuelve una receta (con info adicional).
@app.route('/recetas/<id_receta>', methods=['GET'])
def receta(id_receta):
    try:
        receta = Receta.query.get(id_receta)
        dato_receta = {
            'id':receta.id,
            'nombre':receta.nombre,
            'descripcion':receta.descripcion,
            'imagen':receta.imagen,
            'video':receta.video,
            'tipo_plato':receta.tipo_plato,
            'dificultad':receta.dificultad,
            'ingredientes':receta.ingredientes,
            'receta':receta.receta,
            'calorias':receta.calorias,
            'tiempo_preparacion':receta.tiempo_preparacion,
            'alto_proteinas':receta.alto_proteinas,
            'bajo_carbohidratos':receta.bajo_carbohidratos,
            'apto_vegano':receta. apto_vegano,
            'apto_celiaco':receta.apto_celiaco, 
            'apto_lactosa':receta.apto_lactosa, 
        }
        return jsonify({'receta': dato_receta}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'La receta no existe'}), 200

# URL -> Te devuelve el id de una receta de manera random.
@app.route('/recetas/random/', methods=['GET'])
def recetas_random():
    try:
        receta_random = None
        valor_min_id = Receta.query.order_by(asc(Receta.id)).first()
        valor_max_id = Receta.query.order_by(desc(Receta.id)).first()

        while receta_random == None:
            id_receta_random = random.randint(valor_min_id.id, valor_max_id.id)
            receta_random = Receta.query.get(id_receta_random)

        dato_receta = {
            'id': receta_random.id,
        }
        if recetas == []:
            return jsonify({'Mensaje': 'La receta no existe'}), 200
        else:
            return jsonify({'recetas': dato_receta})
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'La receta no existe'}), 204

# URL -> Crea una receta.
@app.route('/recetas/', methods=['POST'])
def nueva_receta():
    try:
        data = request.json
        nueva_receta = Receta(
            nombre = data.get('nombre'),
            descripcion = data.get('descripcion'),
            imagen = data.get('imagen'),
            video = data.get('video'),
            tipo_plato = data.get('tipo_plato'),
            dificultad = data.get('dificultad'),
            ingredientes = data.get('ingredientes'),
            receta = data.get('receta'),
            calorias = data.get('calorias'),
            tiempo_preparacion = data.get('tiempo_preparacion'),
            alto_proteinas = data.get('alto_proteinas'),
            bajo_carbohidratos = data.get('bajo_carbohidratos'),
            apto_vegano = data.get('apto_vegano'),
            apto_celiaco = data.get('apto_celiaco'),  
            apto_lactosa = data.get('apto_lactosa')
        )
        db.session.add(nueva_receta)
        db.session.commit()

        id_usuario = data.get('id_usuario')
        receta_creada_usuario = RecetaCreada(
            id_usuario = id_usuario,
            id_receta = nueva_receta.id
        )
        db.session.add(receta_creada_usuario)
        db.session.commit()
        return jsonify({'exito': True, 'id_receta': nueva_receta.id}), 201
    except Exception as error:
        print('Error', error)
        return jsonify({'mensaje': 'Error'}), 500

# URL -> Elimina una receta por id segun usuario.
@app.route('/recetas/<id_receta>/<id_usuario>', methods=['DELETE']) 
def eliminar_receta(id_receta, id_usuario):
    try:
        reg_receta_creada = RecetaCreada.query.where(
            RecetaCreada.id_usuario == id_usuario, 
            RecetaCreada.id_receta == id_receta
        ).first()

        if reg_receta_creada:
            db.session.delete(reg_receta_creada)
            db.session.commit()

            receta = Receta.query.get(id_receta)
            if receta:
                db.session.delete(receta)
                db.session.commit()
                return jsonify({'exito': True, 'id_receta': id_receta}), 200
            else:
                return jsonify({'mensaje': 'La receta no existe'}), 404
    except Exception as error:
        print('Error', error)
        return jsonify({'mensaje': 'Error al eliminar receta.'}), 500  

# URL -> Edita una receta por id.
@app.route('/recetas/<id_receta>', methods=['PUT'])
def editar_receta(id_receta):
    try:
        data = request.json 
        receta = Receta.query.get(id_receta)
        if receta:
            receta.nombre = data.get('nombre')
            receta.descripcion = data.get('descripcion')
            receta.imagen = data.get('imagen')
            receta.video = data.get('video')
            receta.tipo_plato = data.get('tipo_plato')
            receta.dificultad = data.get('dificultad')
            receta.ingredientes = data.get('ingredientes')
            receta.receta = data.get('receta')
            receta.calorias = data.get('calorias')
            receta.tiempo_preparacion = data.get('tiempo_preparacion')
            receta.alto_proteinas = data.get('alto_proteinas')
            receta.bajo_carbohidratos = data.get('bajo_carbohidratos')
            receta.apto_vegano = data.get('apto_vegano')
            receta.apto_celiaco = data.get('apto_celiaco')  
            receta.apto_lactosa = data.get('apto_lactosa')
            db.session.commit()
            return jsonify({'exito': True, 'mensaje': 'Receta actualizada con exito'}), 200
        else:
            return jsonify({'mensaje': 'Receta no encontrada'}), 204
    except Exception as error:
        print('Error', error)
        return jsonify({'mensaje': 'Error'}), 500


# URL -> Te devuelve el id de un usuario.
@app.route('/usuario/', methods=['POST'])
def usuario():
    try:
        data = request.json
        nombre = data.get('nombre')
        contraseña = data.get('contraseña')

        usuario = Usuario.query.where(
            Usuario.nombre == nombre,
            Usuario.contraseña == contraseña
        ).first()

        if usuario:
            return jsonify({'exito': True, 'id_usuario': usuario.id}), 200
        else:
            return jsonify({'mensaje': 'El usuario ingresado no existe.'}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'Error'}), 500

# URL -> Crea un usuario.  
@app.route('/usuarios/crear', methods=['POST'])
def nuevo_usuario():
    minCaracteres = 4
    maxCaracteresContra = 16
    maxCaracteresNombre = 12
    try:
        data = request.json
        nombre = data.get('nombre')
        contraseña = data.get('contraseña')

        if Usuario.query.filter_by(nombre=nombre).first():
            return jsonify({'mensaje': 'El nombre de usuario ya existe'}), 400
        if len(nombre) < minCaracteres or len(nombre) > maxCaracteresNombre:
            return jsonify({'mensaje': "El nombre debe contener entre {} y {} caracteres".format(minCaracteres, maxCaracteresNombre)}), 400
        if len(contraseña) < minCaracteres or len(nombre) > maxCaracteresContra:
            return jsonify({'mensaje': "La contraseña debe contener entre {} y {} caracteres".format(minCaracteres, maxCaracteresContra)}), 400

        nuevo_usuario = Usuario(
            nombre = data.get('nombre'),
            contraseña = data.get('contraseña')
        )
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({'exito': True, 'mensaje': 'Usuario creado con exito', 'id': nuevo_usuario.id}), 201
    except Exception as error:
        print('Error', error)
        return jsonify({'mensaje': 'error'}), 404

# URL -> Devuelve las recetas creadas por el usuario.
@app.route('/usuarios/<id_usuario>/recetas/', methods=['GET'])
def recetas_creadas_por_usuario(id_usuario):
    try:
        recetas = Receta.query.join(RecetaCreada).where(RecetaCreada.id_usuario == id_usuario).all()
        datos_receta = []
        for receta in recetas:
            dato_receta = {
                'id':receta.id,
                'nombre':receta.nombre
            }
            datos_receta.append(dato_receta)
        if datos_receta == []:
            return jsonify({'exito': False, 'mensaje': 'No se encuentran recetas favoritas'}), 204
        else:
            return jsonify({'exito': True, 'recetas': datos_receta}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'Error'}), 204

if __name__ == '__main__':
    print('Starting server...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    print('Started...')
    app.run(host='0.0.0.0', debug=True, port=port)