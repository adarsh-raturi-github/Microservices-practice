# ---------------------------------------------------------
# Use Alpine Linux as the base image.
# Alpine is a lightweight Linux distribution (~5 MB),
# which helps keep the final image small.
# ---------------------------------------------------------
FROM alpine


# ---------------------------------------------------------
# Install Redis into the image.
#
# During `docker build`, Docker:
# 1. Creates an intermediate container.
# 2. Executes this command inside it.
# 3. Takes a snapshot of the updated filesystem.
# 4. Creates a new image layer.
# 5. Deletes the intermediate container.
#
# apk = Alpine package manager
# add = Install package
# --update = Update package index before installing
# ---------------------------------------------------------
RUN apk add --update redis


# ---------------------------------------------------------
# Install GCC (GNU C Compiler).
#
# Useful for:
# - Compiling C/C++ programs
# - Building native dependencies
# - Compiling libraries from source
#
# Docker again creates an intermediate container,
# runs this command, snapshots the filesystem,
# and removes the temporary container.
# ---------------------------------------------------------
RUN apk add --update gcc


# ---------------------------------------------------------
# Define the default command to run when a container
# starts from this image.
#
# CMD is NOT executed during `docker build`.
# It only stores metadata in the image.
#
# During `docker run`, Docker executes:
#
#     redis-server
#
# Inside the container:
#
#     PID 1 → redis-server
# ---------------------------------------------------------
CMD ["redis-server"]


# ---------------------------------------------------------
# Build this image:
#
# docker build -t adarsh893/custom-redis-image:1.0.0 .
#
# -t                                  → Assign a tag/name
# adarsh893                           → Docker Hub username
# custom-redis-image                 → Repository name
# 1.0.0                              → Version tag
# .                                  → Current directory (build context)
#
#
# Run this image:
#
# docker run adarsh893/custom-redis-image:1.0.0
#
# Run in background:
#
# docker run -d adarsh893/custom-redis-image:1.0.0
#
#
# Push to Docker Hub:
#
# docker login
# docker push adarsh893/custom-redis-image:1.0.0
#
#
# Pull from Docker Hub:
#
# docker pull adarsh893/custom-redis-image:1.0.0
# ---------------------------------------------------------

