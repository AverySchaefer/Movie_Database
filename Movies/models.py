from django.db import models
from django.db.models.fields import AutoField

# Create your models here.
class Movie(models.model):
    #Fields (database attribute)
    ID = models.IntegerField(AutoField, primary_key=True)
    dirBy = models.CharField(max_length=25, help_text="Enter the name of the director who directed the movie")
    name = models.CharField(max_length=50, help_text="Enter the name of the movie")
    year = models.IntegerField()

    FOURK = '4K'
    BLU_RAY = 'Blu-Ray'
    DVD = 'DVD'
    DIGITAL = 'Digital'
    FORMAT_CHOICES = [
        (FOURK, '4K Blu-Ray'),
        (BLU_RAY, 'Blu-Ray'),
        (DVD, 'DVD'),
        (DIGITAL, 'Digital Download'),
    ]
    format = models.CharField(
        max_length=10,
        choices=FORMAT_CHOICES,
        default=BLU_RAY,
    )

    seen = models.BooleanField()
    score = models.IntegerField()

    ACTION = 'Action'
    ADVENTURE = 'Adventure'
    ANIME = 'Anime'
    COMEDY = 'Comedy'
    DRAMA = 'Drama'
    HORROR = 'Horror'
    MUSICAL = 'Musical'
    SCI_FI = 'Sci-Fi'
    WAR = 'War'
    WESTERN = 'Western'
    GENRE_CHOICES = [
        (ACTION, 'Action'),
        (ADVENTURE, 'Adventure'),
        (ANIME, 'Anime'),
        (COMEDY, 'Comedy'),
        (DRAMA, 'Drama'),
        (HORROR, 'Horror'),
        (MUSICAL, 'Musical'),
        (SCI_FI, 'Science Fiction'),
        (WAR, 'War'),
        (WESTERN, 'Western'),
    ]
    genre = models.CharField(
        max_length=15,
        choices=GENRE_CHOICES,
        default=ACTION,
    )