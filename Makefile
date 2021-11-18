RUN = npm run

INSTALL = npm install

RM = rm -rf

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
	${RM} volumes logs

down:
	${DOCKER_DOWN}
	make clean
	${RM} node_modules

.PHONY : all tests reset clean down