document.addEventListener('DOMContentLoaded', function() {
    const phq9Form = document.getElementById('phq9Form');
    const resultSection = document.getElementById('resultSection');
    const totalScoreElement = document.getElementById('totalScore');
    const interpretationElement = document.getElementById('interpretation');
    const coreItemsElement = document.getElementById('coreItems');
    const recommendationElement = document.getElementById('recommendation');
    const resetBtn = document.getElementById('resetBtn');

    // Handle form submission
    if (phq9Form) {
        phq9Form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Calculate scores
            const formData = new FormData(phq9Form);
            let totalScore = 0;
            let q1Score = 0;
            let q4Score = 0;
            let q9Score = 0;
            
            // Calculate total score and track core items
            for (let i = 1; i <= 9; i++) {
                const value = parseInt(formData.get(`q${i}`)) || 0;
                totalScore += value;
                
                // Track core items (questions 1, 4, and 9)
                if (i === 1) q1Score = value;
                if (i === 4) q4Score = value;
                if (i === 9) q9Score = value;
            }
            
            // Display total score
            totalScoreElement.textContent = totalScore;
            
            // Determine interpretation based on total score
            let interpretationText = '';
            let recommendationText = '';
            
            if (totalScore >= 0 && totalScore <= 4) {
                interpretationText = '没有忧郁症（注意自我保重）';
                recommendationText = '您的得分显示没有抑郁症状。继续保持健康的生活方式和积极的心态。';
            } else if (totalScore >= 5 && totalScore <= 9) {
                interpretationText = '可能有轻微忧郁症';
                recommendationText = '您的得分显示可能有轻微抑郁症状。建议咨询心理医生或心理医学工作者，了解更多关于情绪健康的信息。';
            } else if (totalScore >= 10 && totalScore <= 14) {
                interpretationText = '可能有中度忧郁症';
                recommendationText = '您的得分显示可能有中度抑郁症状。最好咨询心理医生或心理医学工作者，获取专业评估和支持。';
            } else if (totalScore >= 15 && totalScore <= 19) {
                interpretationText = '可能有中重度忧郁症';
                recommendationText = '您的得分显示可能有中重度抑郁症状。建议咨询心理医生或精神科医生，获取专业评估和治疗方案。';
            } else if (totalScore >= 20) {
                interpretationText = '可能有重度忧郁症';
                recommendationText = '您的得分显示可能有重度抑郁症状。一定要看心理医生或精神科医生，及时获取专业评估和治疗。';
            }
            
            // Check core items (questions 1, 4, and 9)
            let coreItemsText = '';
            let hasCoreItemWarning = false;
            
            if (q1Score > 1 || q4Score > 1 || q9Score > 0) {
                hasCoreItemWarning = true;
                coreItemsText += '需要关注的核心症状：';
                
                if (q1Score > 1) {
                    coreItemsText += '<br>- 做事时提不起劲或没有兴趣（抑郁的核心症状）';
                }
                
                if (q4Score > 1) {
                    coreItemsText += '<br>- 感觉疲倦或没有活力（抑郁的核心症状）';
                }
                
                if (q9Score > 0) {
                    coreItemsText += '<br>- 有自伤意念（需要特别关注）';
                    recommendationText += '<br><br><strong>重要提示：</strong>您的回答显示可能有自伤想法，请立即寻求专业帮助。如有紧急情况，请联系当地心理危机干预热线或前往医院就诊。';
                }
            } else {
                coreItemsText = '核心症状评估未发现明显问题。';
            }
            
            // Update result elements
            interpretationElement.textContent = interpretationText;
            coreItemsElement.innerHTML = coreItemsText;
            recommendationElement.innerHTML = recommendationText;
            
            // Show result section with animation
            resultSection.classList.remove('hidden');
            resultSection.style.display = 'block';
            requestAnimationFrame(() => {
                resultSection.style.opacity = '1';
                // Scroll to results
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
            
            return false;
        });
    }
    
    // Reset button functionality
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Hide results
            resultSection.style.opacity = '0';
            
            // Reset form
            phq9Form.reset();
            
            // After animation completes, hide the section
            setTimeout(function() {
                resultSection.style.display = 'none';
                resultSection.classList.add('hidden');
                
                // Scroll back to form
                phq9Form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
    }
});