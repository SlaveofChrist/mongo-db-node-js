FROM mongo

COPY init.json /init.json

CMD mongoimport --host mongo_db --db mydatabase --collection posts --type json --file /init.json --jsonArray