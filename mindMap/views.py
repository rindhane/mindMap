from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    context = {"hello":"The title of the mind map"}
    return render(request,'web_app/index.html',context)

