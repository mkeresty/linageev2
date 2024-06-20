## Origins

Created by Linagee on August 8, 2015 at tx: [0xf18ca6c25eafb634dac8256abe8bb2257f5ad2a1437221c22cbb6b870f97a9a7](https://etherscan.io/tx/0xf18ca6c25eafb634dac8256abe8bb2257f5ad2a1437221c22cbb6b870f97a9a7), this is the first registrar contract on the Ethereum blockchain, predating ENS.  
Linagee first shared the contract on [reddit](https://www.reddit.com/r/ethereum/comments/3iau5v/name_registrar_is_awesome/).  

Soon the contract was forgotten, but in 2022 I rediscovered it while decompiling every contract within the first 300k blocks of the Ethereum blockchain. I was immediately intrigued and tried my best to find the creator, but to no avail. This led me to create an ecosystem around Linagee so the community can be part of history while honor Linagee.

## About

This registrar allows users to claim names by using the `reserve(__name(bytes32))` function. One of these names can then be set as your primary name using the `setAddress(__name(boolean), __a(address), __primary(boolean))` function, which the contract will resolve to your address. There are also read functions that allow one to see the resolved name associated with an address,
and the address that owns a particular name.

Additionally this contract allows users to set sub-names and contents associated with their names.

Note: This contract predates most standards and I therefore I cannot confirm with certainty how these functions, and contract as a whole works.

## Linagee

Within the Ethereum community Linagee is a legend, and somewhat of an enigma. Not only did they deploy the first registrar, they also deployed the very first [smart contract](https://etherscan.io/address/0x6516298e1c94769432ef6d5f450579094e8c21fa) on Ethereum!  
Throughout the next few weeks they deployed several other contracts, along with the first ownable Ethereum asset, TestCoin, which Daniel Bernstein covers in [this article](https://digitalanddusty.com/2022/08/26/linagee-the-legend/).

Linagee is a legend and pioneer on the Ethereum blockchain. We may not be where we are without their early work, and for that, thank you.

## Contributions

Thank you to all of those that have contributed to this project, and a special thanks to Chriton, [DerpHerpenstein](https://x.com/0xDerpNation), [Adam McBride](https://x.com/adamamcbride), and [Leonidas](https://x.com/LeonidasNFT).

## Disclaimer

I cannot confirm the safety of this contract. This website is in no way financial advice, nor am I responsible for anything that could happen. Use at your own risk, and always use a burner wallet.

The source code for this website can be found on my [github](https://github.com/mkeresty/linagee_registrar).


