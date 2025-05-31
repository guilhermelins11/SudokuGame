from django.shortcuts import render, redirect
from django.http import JsonResponse
from jogo.models import Jogador

def home(request):
    board = [[0,0,0, 2,6,0, 7,0,1],
             [6,8,8, 0,7,0, 0,9,0],
             [1,9,0, 0,0,4, 5,0,0],
             [8,2,0, 1,0,0, 0,4,0],
             [0,4,0, 6,0,2, 9,0,0],
             [0,5,0, 0,0,3, 0,2,0],
             [0,0,9, 3,0,0, 0,7,4],
             [0,4,0, 0,5,0, 0,3,6],
             [7,0,3, 0,1,8, 0,0,0]]
    
    return render(request, 'home.html', {'board': board})

def ranking(request):
    if request.method == "POST":
        nome = request.POST.get('nome')
        pontuacao = request.POST.get('pontuacao')

        if nome and pontuacao:
            Jogador.objects.create(nome=nome, pontuacao=int(pontuacao))

        # Recuperando o ranking geral atualizado
        jogadores = list(Jogador.objects.order_by('-pontuacao').values("nome", "pontuacao"))
        
        # Obtendo todas as partidas do usuário para mostrar o histórico corretamente
        historico = list(Jogador.objects.filter(nome=nome).order_by('-pontuacao').values("pontuacao"))

        # Definindo a posição do usuário no ranking
        posicao = next((i + 1 for i, j in enumerate(jogadores) if j["nome"] == nome), None)

        return JsonResponse({"posicao": posicao, "jogadores": jogadores, "historico": historico})

    jogadores = Jogador.objects.order_by('-pontuacao')
    return render(request, 'home.html', {'jogadores': jogadores})