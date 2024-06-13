from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Receta(db.Model):
    __tablename__ = 'recetas'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    instruccion = db.Column(db.Text, nullable=False)
    imagen = db.Column(db.String(255), nullable=False) 
    calorias = db.Column(db.Integer, nullable=False)
    dificultad = db.Column(db.String(50), nullable=False) 
    tiempo_preparacion = db.Column(db.Integer, nullable=False) 
    tipo_plato = db.Column(db.String(50), nullable=False) 
    apto_vegano = db.Column(db.Boolean, nullable=False) 
    apto_vegetariano = db.Column(db.Boolean, nullable=False) 
    apto_celiaco = db.Column(db.Boolean, nullable=False) 
    apto_diabetico = db.Column(db.Boolean, nullable=False) 
    apto_lactosa = db.Column(db.Boolean, nullable=False) 
    apto_keto = db.Column(db.Boolean, nullable=False) 
    recetas_favoritas = db.relationship('RecetaFavorita', backref='receta', uselist=False, lazy=True)


class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False) 
    contraseña = db.Column(db.String(50), nullable=False) 
    recetas_favoritas = db.relationship('RecetaFavorita', backref='usuario', uselist=True, lazy=True)
    
class RecetaFavorita(db.Model):
    __tablename__ = 'recetas_favoritas'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_receta = db.Column(db.Integer, db.ForeignKey('recetas.id'))