"""This renders HTML pages"""
from django.http import HttpResponse

def home_view(request):

    #Django templates will modify that
    H1_STRING = """<h1>Movie Database</h1>"""
    name = "Avery"
    P_STRING = f"""<p>Hello {name}</p>"""
    HTML_STRING = H1_STRING + P_STRING

    #Generate the number of movies in the database
    num_movies = Movie.objects.all().count()
    num_unseen_movies = Movie.objects.filter(seen__exact=False).count()

    context = {
        'num_movies': num_movies,
        'num_unseen_movies': num_unseen_movies,
    }

    return HttpResponse(request, 'index.html', content=context)