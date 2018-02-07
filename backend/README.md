## AWS

# Setup
* create EC2 Key Pair (`chmod 400` the private key)
* create Ubuntu instance and connect
* install [Keter](https://github.com/snoyberg/keter/)
  * `wget -O - https://raw.githubusercontent.com/snoyberg/keter/master/setup-keter.sh | bash`
    * failed with `AesonException "Error in $.packages.cassava.constraints.flags['bytestring--lt-0_10_4']: Invalid flag name: \"bytestring--lt-0_10_4\""`
      upgrade stack first and `stack upgrade`
    * failed with `unix-compat-0.5.0.1 does not match`
      set resolver `stack config set resolver lts-7.19`
    * runs out of memory
      use swap memory
      ```
      sudo fallocate -l 4G /swapfile
      sudo chmod 600 /swapfile
      sudo mkswap /swapfile
      sudo swapon /swapfile
      ```
    * line 65 and 64 need sudo https://github.com/snoyberg/keter/blob/master/setup-keter.sh#L65
      run manually

* install [PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)
  * ```
    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib
    ```
  * ```
    sudo -u postgres createuser postgresUser
    sudo -u postgres createdb tzemanovic
    export PGUSER=postgresUser
    export PGPORT=5432
    ```

# Build & Deploy

```
cd ~/dev/tzemanovic/backend/
yesod keter
rm -r deploy
mkdir -p deploy/dist
cp -r dist/bin deploy/dist/
cp -r config deploy/
cd deploy/
tar -cvzf tzemanovic.keter *
scp tzemanovic.keter tzemanovic:/opt/keter/incoming
```
