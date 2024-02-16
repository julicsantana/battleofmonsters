import { Divider } from "@mui/material"
import { Monster } from "../../models/interfaces/monster.interface"
import { BattleMonsterCard, BattleMonsterTitle, Image, MonsterName, LabelInfo, ProgressBar } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
    const renderMonsterInfo = () => {
        if (!monster) return (
            <BattleMonsterCard centralized>
                <BattleMonsterTitle>{title!}</BattleMonsterTitle>
            </BattleMonsterCard>
        );

        return (
            <BattleMonsterCard>
                <Image src={monster.imageUrl} />
                <MonsterName>{monster.name}</MonsterName>
                <Divider />
                <LabelInfo>HP</LabelInfo>
                <ProgressBar variant="determinate" value={monster.hp} />
                <LabelInfo>Attack</LabelInfo>
                <ProgressBar variant="determinate" value={monster.attack} />
                <LabelInfo>Defense</LabelInfo>
                <ProgressBar variant="determinate" value={monster.defense} />
                <LabelInfo>Speed</LabelInfo>
                <ProgressBar variant="determinate" value={monster.speed} />
            </BattleMonsterCard>
        )
    }

    
    return (
        <>
        {renderMonsterInfo()}
        </>
        // <BattleMonsterCard>
        //     { !monster ? <BattleMonsterTitle>{title!}</BattleMonsterTitle> : null}
        // </BattleMonsterCard>
    )
}

export { MonsterBattleCard }