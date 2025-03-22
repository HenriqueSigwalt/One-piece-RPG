from flask import Flask, render_template,redirect,url_for,jsonify,request,make_response
from sqlalchemy.orm import sessionmaker
from models import *

Session=sessionmaker(bind=connect)
session=Session()

app = Flask(__name__)

@app.route("/")
def teste():
    return render_template("main.html")

@app.route("/entrar")
def entrar():
    return render_template("login.html")

@app.route("/cadastrar")
def cadastrar():
    return render_template("cadastrar.html")

@app.route("/criar")
def criar():
    return render_template("criar.html")

@app.route("/editar")
def editar():
    return render_template("edit.html")

@app.route("/mapa")
def mapa():
    return render_template("map.html")

@app.route("/novo_mapa")
def novoMapa():
    return render_template("novo_mapa.html")

@app.route("/ficha")
def ficha():
    param=int(request.args.get("char"))
    if(param==0):
        return redirect(url_for("criar"))
    return render_template("ficha.html")

@app.route("/check",methods=['POST','GET'])
def check():
    user=None
    if request.method=="POST":
        param=request.get_json()
        res=session.query(Users).filter_by(nome=param["nome"],senha=param["senha"]).first()
        if(res!=None):
            user=[res.nome,res.mestre]
    return make_response(jsonify(user))

@app.route("/register",methods=['POST','GET'])
def register():
    user=None
    if request.method=="POST":
        param=request.get_json()
        res=session.query(Users).filter_by(nome=param["nome"]).first()
        if(res==None):
            new_user=Users(nome=param["nome"],senha=param["senha"],mestre=0)
            session.add(new_user)
            session.commit()
            user=[param["nome"],0]
    return make_response(jsonify(user))

@app.route("/new_char",methods=['POST','GET'])
def new_char():
    if request.method=="POST":
        param=request.get_json()
        new_char=Fichas(dono=param["dono"],nome=param["nome"],recompensa=param["recompensa"],
                status=param["status"],caracteristicas=param["caracteristicas"],
                haki=param["haki"],resistencia=param["resistencia"],
                pericias=param["pericias"],ataques=param["ataques"],nivel=param["nivel"],
                raca=param["raca"],classe=param["classe"],img=param["img"])
        session.add(new_char)
        session.commit()
    return redirect(url_for("teste"))

@app.route("/send_fichas")
def send_fichas():
    param=request.args.get("dono")
    fichas=session.query(Fichas).filter_by(dono=param).all()
    res=[]
    for i in fichas:
        res.append({"nome":i.nome,"ID":i.ID})
    return make_response(jsonify(res))

@app.route("/get_fichas")
def get_fichas():
    param=request.args.get("ficha")
    fichas=session.query(Fichas).filter_by(ID=param).first()
    res={"nome":fichas.nome,"recompensa":fichas.recompensa,"status":fichas.status,
        "caracteristicas":fichas.caracteristicas,"haki":fichas.haki,"resistencia":fichas.resistencia,
        "pericias":fichas.pericias,"ataques":fichas.ataques,"nivel":fichas.nivel,
        "raca":fichas.raca,"classe":fichas.classe,"img":fichas.img}
    return make_response(jsonify(res))

@app.route("/edit_char",methods=['POST','GET'])
def edit_char():
    if request.method=="POST":
        res=request.args.get("ficha")
        param=request.get_json()
        char=session.query(Fichas).filter_by(ID=res).update({
            "nome":param["nome"],"recompensa":param["recompensa"],"status":param["status"],
            "caracteristicas":param["caracteristicas"],"haki":param["haki"],
            "resistencia":param["resistencia"],"pericias":param["pericias"],
            "ataques":param["ataques"],"nivel":param["nivel"],"raca":param["raca"],
            "classe":param["classe"]
        })
        session.commit()
    return redirect(url_for("teste"))

@app.route("/create_map",methods=['POST','GET'])
def create_map():
    if request.method=="POST":
        param=request.get_json()
        new_map=Mapa(fundo=param["fundo"],chars=param["chars"])
        session.add(new_map)
        session.commit()
    return redirect(url_for("teste"))

@app.route("/envia_mapa",methods=['POST','GET'])
def envia_mapa():
    param=session.query(Mapa).filter_by(ativo=1).first()
    res={"fundo":param.fundo,"chars":param.chars}
    return make_response(jsonify(res))