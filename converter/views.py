import json

from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from currency_converter.settings import currencies, vs_currencies, cg


def index(request):
    for vs_currency in vs_currencies:
        if vs_currency not in request.session.keys():
            request.session[vs_currency] = 1
    if cg.ping():
        currency = cg.get_price(
            ids=[i for i in currencies.keys()], vs_currencies=vs_currencies)
        context = {
            'currencies': currencies,
            'currencies2': dict(reversed(list(currencies.items()))),
            'currencies_price': json.dumps(currency),
            'vet_price': currency['bitcoin']['usd'] / currency['vechain']['usd'],
            'btc_to_fiat': currency['bitcoin'],
            'vet_to_fiat': currency['vechain'],
            'session_currency': request.session,
            'show_usd': 'display:none' if request.session["usd"] == 0 else '',
            'show_eur': 'display:none' if request.session["eur"] == 0 else '',
            'show_rub': 'display:none' if request.session["rub"] == 0 else '',
        }
        return render(request, 'converter/good_api.html', context=context)
    return render(request, 'converter/bad_api.html')


@csrf_exempt
def update_selected(request):
    if request.method == 'POST':
        currency = request.body.decode('utf-8')
        if request.session.get(currency) == 1:
            request.session[currency] = 0
        else:
            request.session[currency] = 1
        return HttpResponse(status=200)
    return HttpResponse(status=404)
