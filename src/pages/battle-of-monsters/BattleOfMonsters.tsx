import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, StartBattleButton, WinnerCard } from "./BattleOfMonsters.styled"
import { Monster } from "../../models/interfaces/monster.interface"
import { BattleService } from "../../reducers/battles/battles.sevice"
import { Alert } from "@mui/material"

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()
    const [computerMonster, setComputerMonster] = useState<Monster>();
    const [winner, setWinner] = useState<Monster>();

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, []);

    useEffect(() => {
        if (selectedMonster) {
            setWinner(undefined);
            chooseComputerMonster()
        }
    }, [selectedMonster]);

    const chooseComputerMonster = () => {
        let randomIndex = Math.floor(Math.random() * monsters.length);
        const selectedMonsterIndex = monsters.findIndex(m => m.id === selectedMonster?.id);

        while(randomIndex === selectedMonsterIndex) {
            randomIndex = Math.floor(Math.random() * monsters.length);
        }

        setComputerMonster(monsters[randomIndex]);
    }

    const handleStartBattleClick = async () => {
        if (selectedMonster && computerMonster) {
            const data = {
                monster1Id: selectedMonster.id,
                monster2Id: computerMonster.id
            }
            const response = await BattleService.startBattle(data);

            console.log(response);
            if (response) {
                setWinner(response.winner);
            }
        }
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} />

            {winner ? <WinnerCard icon={false}>{winner?.name} wins!</WinnerCard> : null}

            <BattleSection>
                <MonsterBattleCard title="Player" monster={selectedMonster}></MonsterBattleCard>
                <StartBattleButton data-testid="start-battle-button" disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard title="Computer" monster={computerMonster}></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }