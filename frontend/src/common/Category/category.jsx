
import categoryBest from "../../assets/images/category-best@3x.png";
import categoryDiscount from "../../assets/images/category-discount@3x.png";
import categorySeasonal from "../../assets/images/category-seasonal@3x.png";
import categoryVegitable from "../../assets/images/category-vegitable@3x.png";
import categoryHealthy from "../../assets/images/category-healthy@3x.png";
import styled from "styled-components";


const CategoryBox = styled.div`
  padding: 26px 16px 38px 16px;
  display: flex;
  overflow: auto;
  scrollbar-width: none;
`

const CategoryIconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`



const CategoryIcon = styled.img`
    width: 34px;
    height: 34px;
    padding: 13px;
    background-color: #efefef;
    border-radius: 50%;

    object-fit: contain;
    src: ${(props) => props.src}
`

const CategoryText = styled.div`
  font-family: AppleSDGothicNeo;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #272727;
  margin-top: 8px;
`

const CategoryBottomLine = styled.div`
  height: 1px;
  background-color: #efefef;
  margin: 0 16px;
`

export const CategoryComponent = () => {
    return (
        <div>
                <CategoryBox>
                    <CategoryIconBox>
                        <CategoryIcon src={categoryBest}></CategoryIcon>
                        <CategoryText> BEST </CategoryText>
                    </CategoryIconBox>

                    <CategoryIconBox>   
                        <CategoryIcon src={categoryDiscount}></CategoryIcon>
                        <CategoryText> 할인중% </CategoryText>
                    </CategoryIconBox>

                    <CategoryIconBox>   
                        <CategoryIcon src={categorySeasonal}></CategoryIcon>
                        <CategoryText> 제철과일 </CategoryText>
                    </CategoryIconBox>

                    <CategoryIconBox>   
                        <CategoryIcon src={categoryVegitable}></CategoryIcon>
                        <CategoryText> 채소 </CategoryText>
                    </CategoryIconBox>

                    <CategoryIconBox>   
                        <CategoryIcon src={categoryHealthy}></CategoryIcon>
                        <CategoryText> 무농약 </CategoryText>
                    </CategoryIconBox>
                </CategoryBox>
                <CategoryBottomLine />
            </div>
    );
}