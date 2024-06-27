from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Receta(db.Model):
    __tablename__ = 'recetas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(100), nullable=False)
    imagen = db.Column(db.String(255), nullable=False) 
    video = db.Column(db.String(255), nullable=False)
    ingredientes = db.Column(db.Text, nullable=False)
    receta = db.Column(db.Text, nullable=False)
    tipo_receta = db.Column(db.String(100), nullable=False)
    dificultad = db.Column(db.String(100), nullable=False)
    calorias = db.Column(db.Integer, nullable=False)
    tiempo_preparacion = db.Column(db.Integer, nullable=False) 
    alto_proteinas = db.Column(db.Boolean, nullable=False) 
    bajo_carbohidratos = db.Column(db.Boolean, nullable=False) 
    apto_vegano = db.Column(db.Boolean, nullable=False) 
    apto_celiaco = db.Column(db.Boolean, nullable=False) 
    apto_lactosa = db.Column(db.Boolean, nullable=False) 
    recetas_creadas = db.relationship('RecetaCreada', backref='receta', uselist=False, lazy=True)

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False) 
    contraseña = db.Column(db.String(50), nullable=False) 
    recetas_creadas = db.relationship('RecetaCreada', backref='usuario', uselist=True, lazy=True)

class RecetaCreada(db.Model):
    __tablename__ = 'recetas_creadas'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_receta = db.Column(db.Integer, db.ForeignKey('recetas.id'))