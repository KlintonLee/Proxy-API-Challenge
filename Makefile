RUN = npm run

INSTALL = npm install

DOCKER_UP = docker-compose up -d
DOCKER_DOWN = docker-compose down

all:
	${DOCKER_UP}
	${INSTALL}
	${RUN} dev

tests:
	${RUN} test

reset:
	${DOCKER_DOWN}
	make clean
	${DOCKER_UP}

clean:
	rm -rf volumes logs

.PHONY : all tests reset clean