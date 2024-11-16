Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:8080'

    resource '*',
             headers: :any,
             expose: ["access-token", "expiry", "token-type", "uid", "client"],
             methods: %i[get post put patch delete options head],
             credentials: true

    Rails.logger.info 'CORS headers added for origin http://localhost:8080'
  end
end
