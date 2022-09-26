#Dont include node modules to git, just don't
node_modules

#no need to store package lock in git, its generated on the fly, just the regular package.json is fine
package-lock.json

#tsconfig.prod.json is sensitive production information for your application, not for a public repo, only private
tsconfig.prod.json

# ignore the bin folders
bin

# Don't let them see your keys!!! Ideally you want all your stuff in a private github or gitignored if you have API keys and such
production.env

# Dont put migration folders up, make your own DB's chumps
migrations