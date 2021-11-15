RUN = npm run

INSTALL = npm install

DOCKER_UP = docker-compose up

all:
	${DOCKER_UP} -d
	${INSTALL}
	${RUN} dev

tests:
	${RUN} test

clean:
	rm -rf volumes logs

.PHONY : all tests clean