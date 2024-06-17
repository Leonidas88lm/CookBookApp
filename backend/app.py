from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Receta, Usuario, RecetasFavoritaUsuario, RecetaCreadaUsuario
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
                'imagen':receta.imagen,
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
            'imagen':receta.imagen,
            'instruccion':receta.instruccion,
            'calorias':receta.calorias,
            'dificultad':receta.dificultad,
            'tiempo_preparacion':receta.tiempo_preparacion,
            'tipo_plato':receta.tipo_plato,
            'apto_vegano':receta. apto_vegano,
            'apto_vegetariano':receta.apto_vegetariano, 
            'apto_celiaco':receta.apto_celiaco,
            'apto_diabetico':receta.apto_diabetico,  
            'apto_lactosa':receta.apto_lactosa, 
            'apto_keto':receta.apto_keto, 
        }
        return jsonify({'receta': dato_receta}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'La receta no existe'}), 200

# URL -> Te devuelve segun la busqueda, la/s receta/s.
@app.route('/recetas/busqueda/', methods=['GET'])
def buscar_receta_nombre():
    try:
        datos_receta = []
        nombre_buscado = request.args.get('nombre')
        recetas = Receta.query.all() 
        for receta in recetas:
            if nombre_buscado.lower() in receta.nombre.lower():
                dato_receta = {
                    'id':receta.id,
                    'nombre':receta.nombre,
                    'imagen':receta.imagen,
                }
                datos_receta.append(dato_receta)
        if recetas == []:
            return jsonify({'Mensaje': 'La receta no existe'}), 200
        else:
            return jsonify({'recetas': datos_receta}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'Error'}), 500       

# URL -> Te devuelve segun los filtros aplicados, la/s receta/s.
@app.route('/recetas/filtro/', methods=['GET'])
def filtrar_recetas():
    try:
        data = request.args
        # Consulta acumulativa.
        query = Receta.query
        if data.get('calorias'):
            query = query.filter(Receta.calorias <= data.get('calorias'))
        if data.get('dificultad'):
            query = query.filter((Receta.dificultad) == data.get('dificultad').lower())
        if data.get('tiempo_preparacion'):
            query = query.filter((Receta.tiempo_preparacion) < data.get('tiempo_preparacion'))
        if data.get('tipo_plato'):
            query = query.filter((Receta.tipo_plato) == data.get('tipo_plato').lower())
        if data.get('apto_vegano'):
            query = query.filter((Receta.apto_vegano) == data.get('apto_vegano'))
        if data.get('apto_vegetariano'):
            query = query.filter((Receta.apto_vegetariano) == data.get('apto_vegetariano'))
        if data.get('apto_celiaco'):
            query = query.filter((Receta.apto_celiaco) == data.get('apto_celiaco'))
        if data.get('apto_diabetico'):
            query = query.filter((Receta.apto_diabetico) == data.get('apto_diabetico'))
        if data.get('apto_lactosa'):
            query = query.filter((Receta.apto_lactosa) == data.get('apto_vegetariano'))
        if data.get('apto_keto'):
            query = query.filter((Receta.apto_keto) == data.get('apto_keto'))
        recetas = query.all()
        
        datos_receta = []
        for receta in recetas:
            dato_receta = {
                'id':receta.id,
                'nombre':receta.nombre,
                'imagen':receta.imagen,
            }
            datos_receta.append(dato_receta)
        if datos_receta == []:
            return jsonify({'Mensaje': 'Los filtros aplicados no coinciden con alguna receta'}), 200
        else:
            return jsonify({'recetas': datos_receta}), 200
    except Exception as error:
        print('Error', error)
        return jsonify({'Mensaje': 'Error'}), 500

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

# URL -> Crea una receta (CURL POST).
@app.route('/recetas/', methods=['POST'])
def nueva_receta():
    try:
        data = request.json
        nueva_receta = Receta(
            nombre = data.get('nombre'),
            imagen = data.get('imagen'),
            instruccion = data.get('instruccion'),
            calorias = data.get('calorias'),
            dificultad = data.get('dificultad'),
            tiempo_preparacion = data.get('tiempo_preparacion'),
            tipo_plato = data.get('tipo_plato'),
            apto_vegano = data.get('apto_vegano'),
            apto_vegetariano = data.get('apto_vegetariano'), 
            apto_celiaco = data.get('apto_celiaco'),
            apto_diabetico = data.get('apto_diabetico'),  
            apto_lactosa = data.get('apto_lactosa'), 
            apto_keto = data.get('apto_keto')
        )
        db.session.add(nueva_receta)
        db.session.commit()
        return jsonify({'message': 'Receta creada con exito'}), 201
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500

# URL -> Elimina una receta por id (CURL DELETE).
@app.route('/recetas/<id_receta>', methods=['DELETE']) 
def eliminar_receta(id_receta):
    try:
        receta = Receta.query.get(id_receta)
        if receta:
            db.session.delete(receta)
            db.session.commit()
            return jsonify({'message': 'Receta eliminada con exito'}), 200
        else:
            return jsonify({'message': 'La receta no existe'}), 404
    except Exception as error:
        print('Error', error)
        return jsonify({'mensaje': 'Error al eliminar receta.'}), 500  

# URL -> Edita una receta por id (CURL PUT).
@app.route('/recetas/<id_receta>', methods=['PUT'])
def editar_receta(id_receta):
    try:
        data = request.json 
        receta = Receta.query.get(id_receta)
        if receta:
            receta.nombre = data.get('nombre')
            receta.imagen = data.get('imagen')
            receta.instruccion = data.get('instruccion')
            receta.calorias = data.get('calorias')
            receta.dificultad = data.get('dificultad')
            receta.tiempo_preparacion = data.get('tiempo_preparacion')
            receta.tipo_plato = data.get('tipo_plato')
            receta.apto_vegano = data.get('apto_vegano')
            receta.apto_vegetariano = data.get('apto_vegetariano') 
            receta.apto_celiaco = data.get('apto_celiaco')
            receta.apto_diabetico = data.get('apto_diabetico') 
            receta.apto_lactosa = data.get('apto_lactosa')
            receta.apto_keto = data.get('apto_keto')
            db.session.commit()
            return jsonify({'message': 'Receta actualizada con exito'}), 200
        else:
            return jsonify({'message': 'Receta no encontrada'}), 204
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500


if __name__ == '__main__':
    print('Starting server...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    print('Started...')
    app.run(host='0.0.0.0', debug=True, port=port)