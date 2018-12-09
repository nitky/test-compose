all: build test run
build:
	./puppetester/build.sh
	docker-compose build
clean:
	docker-compose rm -f -s
test:
	docker-compose up -d
	docker-compose -f test-from-host-nw.yml run --user 'pptruser' --rm test sh -c 'dockerize -wait $${TARGET_URL} /app/node_modules/.bin/jest'
	docker-compose stop # 止める必要がない場合は止めなくても良い
run:
	docker-compose up
stop:
	docker-compose stop