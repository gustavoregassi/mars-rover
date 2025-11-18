# 🟠 MARS ROVER – Exploração de Marte com Three.js


## Descrição Geral do Projeto



Este projeto foi desenvolvido como trabalho prático da disciplina **Computação Gráfica**, com o objetivo de criar uma aplicação gráfica interativa em **Three.js** que simule um **ambiente de exploração planetária 3D**.  



O trabalho segue todas as orientações previstas pelo professor Gabriel Marcelino Alves, integrando **iluminação realista**, **texturas detalhadas**, **modelos 3D importados**, **navegação interativa** e **design criativo com temática definida**.



---

##  Conceito do Projeto



A proposta do grupo é desenvolver um **cenário 3D** vasto e desértico que simule a superfície de Marte, utilizando **texturas de rochas, areia avermelhada e relevos**.  

O ponto central do projeto é o controle interativo de um Rover de Exploração em terceira pessoa.
O cenário será totalmente explorável, permitindo ao usuário mover o Rover com as teclas do teclado (W, A, S, D) em um ambiente com iluminação de Sol marciana 
(luz direcional) e texturas de alta resolução.

O objetivo é **simular uma missão de coleta ou mapeamento**, incentivando a exploração de crateras e elevações.



---



## Elementos e Requisitos Atendidos



### 💡 Iluminação Realista

O ambiente contará com **duas fontes principais de luz**, simulando as condições de Marte:

- ☀️ **Luz direcional (Solar)**, com tonalidade avermelhada e intensidade reduzida, projetando sombras longas e dinâmicas sobre a paisagem.

- 💡 **Luz ambiente (Reflexão Atmosférica)**, para suavizar as sombras e criar uma sensação de iluminação difusa característica do planeta.


Além disso, o Rover poderá ter uma luz pontual própria, simulando faróis.


**Requisito atendido:** diferentes tipos de luz com intensidade ajustável e sombras.



---


### Texturas e Materiais

As superfícies do mundo utilizarão **texturas de solo marciano**, aplicadas para aumentar o realismo do cenário:

- **Chão (Terreno):** textura de areia e rochas avermelhadas com mapeamento de relevo

- **Relevos:** Objetos 3D ou geometria com texturas rochosas detalhadas.  

- **Céu:** Um Skybox com cores escuras e a tonalidade azul-alaranjada típica da atmosfera marciana.


**Requisito atendido:** aplicação de texturas variadas e mapeamento de relevo.


---


###  Modelos 3D Importados

O projeto incluirá pelo menos **três modelos 3D externos**, em formato `.glb`, obtidos de repositórios gratuitos como **Sketchfab** ou **NASA 3D Resources** e **Three.js**.  

Modelos previstos:

- 🤖 **Rover de Exploração (Principal)**, controlado pelo usuário.  

- 📡 **Antena/Equipamento Científico**, posicionado em um ponto fixo do mapa.

- ⛰️ **Formação Rochosa Complexa ou Cratera**


 **Requisito atendido:** carregamento e integração de objetos 3D externos.


---



###  Navegação Interativa

A navegação será realizada através do controle de um **ROVER** em **terceira pessoa**, utilizando as seguintes teclas:



| Tecla | Ação |

|-------|------|

| **W** | ROVER acelara para frente         |

| **A** | Vira a câmera para a esquerda     |

| **S** | ROVER acelera para trás           |

| **D** | Vira a câmera para a direita      |

| **SHIFT** | Ativa o turbo                 |



A **câmera acompanha o ROVER**, proporcionando uma visualização fluida e imersiva do terreno.



 **Requisito atendido:** sistema de navegação interativo e funcional.



---



###  Design Criativo e Temática

A estética do projeto é focada na **exploração espacial**, e no ambiente hostil de Marte, unindo o realismo da iluminação e texturas com a interatividade de um veículo explorador.  


O objetivo é combinar **simulação científica** com **imersão do jogador**, no cenário marciano.



 **Requisito atendido:** design criativo com tema definido e atenção aos detalhes visuais.




## 👥 Autores



- **Gustavo Francisco Regassi**  

- **Nicholas Alexandre Destefano**



---



##  Instruções de Execução



1. Baixe ou clone o repositório:

   ```bash

   git clone (https://github.com/gustavoregassi/mars-rover)

   cd mars-rover


2. **Instale e inicie um servidor web local:**

   *(Geralmente, projetos Three.js precisam ser rodados em um servidor por questões de segurança (CORS/acesso a arquivos). Se o seu professor usa um servidor específico, adapte o comando abaixo).*

   ```bash

   # Instale o live-server (se ainda não tiver)

   npm install -g live-server



   # Inicie o projeto

   live-server

   ```



3. **Acesse o link:**

   O projeto abrirá automaticamente no seu navegador em `http://127.0.0.1:8080/` (ou porta similar).
