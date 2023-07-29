# Start from Python 3.8 base image
FROM python:3.8-slim

# Install the dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt --target /var/task

# Copy our function code
COPY run.py /var/task