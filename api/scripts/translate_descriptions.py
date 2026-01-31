import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from database.database import SessionLocal
from models.car import Car


def translate_descriptions():
    db = SessionLocal()
    try:
        cars = db.query(Car).filter(Car.description != None).all()
        translated = 0
        
        for car in cars:
            if not car.description:
                continue
                
            desc = car.description.lower()
            
            if 'hatchback do segmento c' in desc:
                car.description = car.description.replace('Hatchback do Segmento C', 'Hatchback in C-segment')
                car.description = car.description.replace('hatchback do segmento c', 'Hatchback in C-segment')
                translated += 1
            elif 'hatchback ou supermini do segmento b' in desc:
                car.description = car.description.replace('Hatchback ou supermini do Segmento B', 'Hatchback or supermini in B-segment')
                translated += 1
            elif 'fastback do segmetno c ou cupê de 4 portas' in desc:
                car.description = car.description.replace('Fastback do Segmetno C ou cupê de 4 portas', 'Fastback C-segment or 4-door coupe')
                translated += 1
            elif 'modelo irmão do lavida' in desc:
                car.description = car.description.replace('Modelo irmão do lavida', 'Sister model of the Lavida')
                translated += 1
            elif 'eletrico liftback do segmento d' in desc or 'elétrico liftback do segmento d' in desc:
                car.description = car.description.replace('Elétrico Liftback do segmento D', 'Electric liftback in D-segment')
                car.description = car.description.replace('Eletrico Liftback do segmento D', 'Electric liftback in D-segment')
                translated += 1
            elif 'sedã compacto' in desc:
                car.description = car.description.replace('Sedã compacto (segmento C)', 'Compact sedan (C-segment)')
                translated += 1
            elif 'um cupê de quatro portas ou um sedã de teto baixo' in desc:
                car.description = car.description.replace('Um cupê de quatro portas ou um sedã de teto baixo para o mercado chinês', 'A four-door coupe or low-roof sedan for the Chinese market')
                translated += 1
            elif 'foi o modelo mais vendido' in desc:
                car.description = car.description.replace('Foi o modelo mais vendido da Volkswagen na China', 'Was the best-selling Volkswagen model in China')
                translated += 1
            elif 'a versão chinesa do passat' in desc:
                car.description = car.description.replace('A versão chinesa do Passat B9 com um entre-eixo mais longo', 'The Chinese version of Passat B9 with a longer wheelbase')
                translated += 1
            elif 'sedãs desenvolvidos para o mercado chinês' in desc:
                car.description = car.description.replace('Sedãs desenvolvidos para o mercado chinês', 'Sedans developed for the Chinese market')
                translated += 1
            elif 'versão sedan do polo' in desc:
                car.description = car.description.replace('Versão sedan do Polo Mk6', 'Sedan version of the Polo Mk6')
                translated += 1
            elif 'shooting brake versão do arteon' in desc:
                car.description = car.description.replace('Shooting brake versão do Arteon', 'Shooting brake version of the Arteon')
                translated += 1
            elif 'versão perua do golf' in desc:
                car.description = car.description.replace('Versão perua do Golf', 'Wagon version of the Golf')
                translated += 1
            elif 'versão perua do id.7' in desc:
                car.description = car.description.replace('Versão perua do ID.7', 'Wagon version of the ID.7')
                translated += 1
            elif 'suv crossover de médio porte' in desc:
                car.description = car.description.replace('SUV crossover de médio porte com três fileiras de bancos', 'Mid-size crossover SUV with three rows of seats')
                translated += 1
            elif 'versões de duas fileiras' in desc:
                car.description = car.description.replace('Versões de duas fileiras do Atlas/Teramont regular com teto traseiro inclinado', 'Two-row versions of the regular Atlas/Teramont with sloping rear roof')
                translated += 1
            elif 'construído sobre uma plataforma dedicada' in desc:
                car.description = car.description.replace('Construído sobre uma plataforma dedicada para veículos elétricos (plataforma MEB)', 'Built on a dedicated platform for electric vehicles (MEB platform)')
                translated += 1
            elif 'versão suv crossover cupê' in desc:
                car.description = car.description.replace('Versão SUV crossover cupê do ID.4', 'SUV crossover coupe version of the ID.4')
                translated += 1
            elif 'renomeado cupra tavascan' in desc:
                car.description = car.description.replace('renomeado Cupra Tavascan com pequenas mudanças estéticas', 'renamed Cupra Tavascan with minor cosmetic changes')
                translated += 1
            elif 'suv crossover do segmento b' in desc:
                car.description = car.description.replace('SUV crossover do segmento B construído sobre a plataforma MQB A0', 'B-segment crossover SUV built on MQB A0 platform')
                translated += 1
            elif 'disponível principalmente na europa' in desc:
                car.description = car.description.replace('Disponível principalmente na Europa e na China', 'Available mainly in Europe and China')
                translated += 1
            elif 'parente do jetta vs5' in desc:
                car.description = car.description.replace('Parente do Jetta VS5, SEAT Ateca e Škoda Karoq', 'Related to Jetta VS5, SEAT Ateca and Škoda Karoq')
                translated += 1
            elif 'suv crossover rebaixado' in desc:
                car.description = car.description.replace('SUV crossover rebaixado, baseado principalmente no Polo Mk6', 'Lowered crossover SUV, mainly based on the Polo Mk6')
                translated += 1
            elif 'suv crossover de três fileiras' in desc:
                car.description = car.description.replace('SUV crossover de três fileiras de assentos, de tamanho normal, para o mercado chinês', 'Full-size three-row crossover SUV for the Chinese market')
                translated += 1
            elif 'abaixo do talagon' in desc:
                car.description = car.description.replace('abaixo do Talagon', 'below the Talagon')
                translated += 1
            elif 'modelo irmão do tiguan' in desc:
                car.description = car.description.replace('Modelo irmão do Tiguan', 'Sister model of the Tiguan')
                translated += 1
            elif 'sucessor do tiguan allspace' in desc:
                car.description = car.description.replace('Sucessor do Tiguan Allspace', 'Successor to the Tiguan Allspace')
                translated += 1
            elif 'primeiro suv crossover' in desc:
                car.description = car.description.replace('Primeiro SUV crossover já construído pela Volkswagen', 'First SUV crossover ever built by Volkswagen')
                translated += 1
            elif 'versao de pasageiro do caddy' in desc:
                car.description = car.description.replace('Versao de pasageiro do Caddy', 'Passenger version of the Caddy')
                translated += 1
            elif 'baseado no caddy' in desc:
                car.description = car.description.replace('Baseado no Caddy', 'Based on the Caddy')
                translated += 1
            elif 'campervan baseado no crafter' in desc:
                car.description = car.description.replace('Campervan baseado no Crafter', 'Campervan based on the Crafter')
                translated += 1
            elif 'elétrico minivan elétrica' in desc or 'eletrico minivan eletrica' in desc:
                car.description = car.description.replace('Elétrico Minivan elétrica a bateria construída acima da plataforma MEB', 'Electric battery-powered minivan built on MEB platform')
                car.description = car.description.replace('Eletrico Minivan eletrica a bateria construída acima da plataforma MEB', 'Electric battery-powered minivan built on MEB platform')
                translated += 1
            elif 'monovolume compacto' in desc:
                car.description = car.description.replace('Monovolume compacto de três fileiras', 'Compact MPV with three rows')
                translated += 1
            elif 'minivan grande de três fileiras' in desc:
                car.description = car.description.replace('Minivan grande de três fileiras com portas deslizantes para o mercado chinês', 'Large three-row minivan with sliding doors for the Chinese market')
                translated += 1
            elif 'veículo para atividades de lazer' in desc:
                car.description = car.description.replace('Veículo para atividades de lazer ou pequena van', 'Leisure vehicle or small van')
                translated += 1
            elif 'van grande' in desc:
                car.description = car.description.replace('Van grande. Também vendida como MAN TGE', 'Large van. Also sold as MAN TGE')
                translated += 1
            elif 'versão van do id. buzz' in desc:
                car.description = car.description.replace('Versão van do ID. Buzz', 'Van version of the ID. Buzz')
                translated += 1
            elif 'van de médio porte' in desc:
                car.description = car.description.replace('Van de médio porte. Disponível como furgão', 'Mid-size van. Available as cargo van')
                translated += 1
            elif 'picape de médio porte' in desc:
                car.description = car.description.replace('Picape de médio porte', 'Mid-size pickup truck')
                translated += 1
            elif 'caminhonete compacta baseada no gol' in desc:
                car.description = car.description.replace('Caminhonete compacta baseada no Gol', 'Compact pickup based on the Gol')
                translated += 1
            elif 'volkswagen fusca' in desc and 'tipo 1' in desc:
                car.description = "Volkswagen Beetle (Type 1) (1938-2003). The iconic people's car."
                translated += 1
            elif 'veículo militar leve' in desc:
                car.description = car.description.replace('veículo militar leve', 'light military vehicle')
                translated += 1
            elif 'carro oficial' in desc:
                car.description = car.description.replace('carro oficial da Wehrmacht', 'official car of the Wehrmacht')
                translated += 1
            elif 'também vendido como' in desc and 'kurierwagen' in desc:
                car.description = car.description.replace('também vendido como Kurierwagen, Trekker, Thing, Safari', 'also sold as Kurierwagen, Trekker, Thing, Safari')
                translated += 1

        db.commit()
        print(f"Translated {translated} descriptions to English")
    finally:
        db.close()


if __name__ == '__main__':
    translate_descriptions()
