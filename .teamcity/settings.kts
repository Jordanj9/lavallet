import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.PullRequests
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2019_2.buildFeatures.pullRequests
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.projectFeatures.githubConnection
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs

/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.

VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.

To debug settings scripts in command-line, run the

    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate

command and attach your debugger to the port 8000.

To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2020.2"

project {

    buildType(Build)

    features {
        githubConnection {
            id = "PROJECT_EXT_5"
            displayName = "GitHub.com"
            clientId = "4d3b4f37f17cb79745a1"
            clientSecret = "credentialsJSON:4542a3eb-bb4a-42b9-ab11-f551dc256816"
        }
    }
}

object Build : BuildType({
    name = "Build"

    publishArtifacts = PublishMode.SUCCESSFUL

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        script {
            name = "Paso 1"
            scriptContent = "composer install"
        }
        script {
            name = "Paso 2"
            scriptContent = "composer dump-autoload -o"
        }
        script {
            name = "Ejecutando Test"
            scriptContent = "vendor/bin/phpunit"
        }
    }

    triggers {
        vcs {
        }
    }

    features {
        pullRequests {
            vcsRootExtId = "${DslContext.settingsRoot.id}"
            provider = github {
                authType = token {
                    token = "credentialsJSON:73aefe66-df95-48fa-967e-5803f948e39d"
                }
                filterTargetBranch = "+:refs/heads/main"
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
        commitStatusPublisher {
            vcsRootExtId = "${DslContext.settingsRoot.id}"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:73aefe66-df95-48fa-967e-5803f948e39d"
                }
            }
        }
    }
})
