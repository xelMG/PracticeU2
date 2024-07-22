from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash
from prometheus_client import Counter, generate_latest, CollectorRegistry, CONTENT_TYPE_LATEST

app = Flask(__name__)
api = Api(app)

# Prometheus metrics
registry = CollectorRegistry()
hash_counter = Counter('password_hash_requests_total', 'Total password hash requests', registry=registry)
verify_counter = Counter('password_verify_requests_total', 'Total password verify requests', registry=registry)
hash_error_counter = Counter('password_hash_errors_total', 'Total password hash errors', registry=registry)
verify_error_counter = Counter('password_verify_errors_total', 'Total password verify errors', registry=registry)

class PasswordManager(Resource):
    def post(self):
        data = request.get_json()
        password = data.get('password')

        if not password:
            hash_error_counter.inc()
            return {'message': 'Password is required'}, 400

        hashed_password = generate_password_hash(password)
        hash_counter.inc()
        return {'hashed_password': hashed_password}, 201

    def put(self):
        data = request.get_json()
        password = data.get('password')
        hashed_password = data.get('hashed_password')

        if not password or not hashed_password:
            verify_error_counter.inc()
            return {'message': 'Password and hashed_password are required'}, 400

        is_correct = check_password_hash(hashed_password, password)
        verify_counter.inc()
        return {'is_correct': is_correct}, 200

api.add_resource(PasswordManager, '/password')

@app.route('/metrics')
def metrics():
    return generate_latest(registry), 200, {'Content-Type': CONTENT_TYPE_LATEST}

if __name__ == '__main__':
    app.run(debug=True)
