pipeline {
    agent any

    environment {
        DOCKER_HUB = "sridharbr28"
        BACKEND_IMAGE = "mern-backend"
        FRONTEND_IMAGE = "mern-frontend"
    }

    stages {

        stage('Cleanup Old Containers & Images') {
            steps {
                sh '''
                echo " Cleaning old containers..."
                docker rm -f backend-container || true
                docker rm -f frontend-container || true

                echo " Cleaning unused images..."
                docker image prune -f
                '''
            }
        }

        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/sridhar2822/mern-devops-project.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKER_HUB/$BACKEND_IMAGE ./backend'
                sh 'docker build -t $DOCKER_HUB/$FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo "$PASS" | docker login -u "$USER" --password-stdin
                    docker push $DOCKER_HUB/$BACKEND_IMAGE
                    docker push $DOCKER_HUB/$FRONTEND_IMAGE
                    '''
                }
            }
        }

        stage('Run New Containers') {
            steps {
                sh '''
                echo " Starting new containers..."

                docker run -d -p 5000:5000 --name backend-container $DOCKER_HUB/$BACKEND_IMAGE
                docker run -d -p 3000:80 --name frontend-container $DOCKER_HUB/$FRONTEND_IMAGE
                '''
            }
        }

    }

    post {
        success {
            echo ' Pipeline executed successfully!'
        }
        failure {
            echo ' Pipeline failed. Check logs!'
        }
    }
}
