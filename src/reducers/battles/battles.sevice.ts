import { API_URL } from '../../constants/env';
import { Battle } from '../../models/interfaces/battle.interface';

const startBattle = async (data: {monster1Id: string, monster2Id: string}): Promise<Battle> => {
    return await fetch(`${API_URL}/battle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json());
}

export const BattleService = {
    startBattle,
};
