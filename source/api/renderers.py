import json

from rest_framework.renderers import JSONRenderer


class AccountJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        errors = data.get('errors', None)
        if errors is not None:
            return super(AccountJSONRenderer, self).render(data)
        token = data.get('token', None)
        if token is not None and isinstance(token, bytes):
            data['token'] = token.decode('utf-8')
        return json.dumps({'user': data})
