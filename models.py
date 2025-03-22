from sqlalchemy import create_engine,text,String,Integer,Column
from sqlalchemy.ext.declarative import declarative_base

engine=create_engine('sqlite:///one_piece.db')
connect=engine.connect()
base=declarative_base()

class Users(base):
    __tablename__="users"
    ID=Column(Integer,primary_key=True)
    nome=Column(String)
    senha=Column(String)
    mestre=Column(Integer)
    
class Fichas(base):
    __tablename__="fichas"
    ID=Column(Integer,primary_key=True)
    dono=Column(String)
    nome=Column(String)
    recompensa=Column(String)
    status=Column(String)
    caracteristicas=Column(String)
    haki=Column(String)
    resistencia=Column(String)
    pericias=Column(String)
    ataques=Column(String)
    nivel=Column(Integer)
    raca=Column(String)
    classe=Column(String)
    img=Column(String)
    
class Mapa(base):
    __tablename__="mapa"
    ID=Column(Integer,primary_key=True)
    fundo=Column(String)
    chars=Column(String)
    ativo=Column(Integer)