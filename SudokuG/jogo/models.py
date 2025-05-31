from django.db import models

class SudokuBoard(models.Model):
    name = models.CharField(max_length=100)
    board = models.TextField()
    solution = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Jogador(models.Model):
    nome = models.CharField(max_length=100)
    pontuacao = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nome} - {self.pontuacao}"