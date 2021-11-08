"""This renders HTML pages"""
from django.http import HttpResponse

def home_view(request):

    #Django templates will modify that
    H1_STRING = """<h1>Movie Database</h1>"""
    name = "Avery"
    P_STRING = f"""<p>Hello {name}</p>"""
    HTML_STRING = H1_STRING + P_STRING
    
    return HttpResponse(HTML_STRING)