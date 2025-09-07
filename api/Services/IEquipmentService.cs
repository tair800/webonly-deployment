using WebOnlyAPI.DTOs;

namespace WebOnlyAPI.Services
{
    public interface IEquipmentService
    {
        Task<IEnumerable<EquipmentListResponseDto>> GetAllAsync();
        Task<IEnumerable<EquipmentResponseDto>> GetAllFullAsync();
        Task<EquipmentResponseDto?> GetByIdAsync(int id);
        Task<EquipmentResponseDto> CreateAsync(CreateEquipmentDto dto);
        Task<EquipmentResponseDto?> UpdateAsync(int id, UpdateEquipmentDto dto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<EquipmentResponseDto>> SearchByNameAsync(string searchTerm);

        // Category CRUD operations
        Task<IEnumerable<EquipmentCategoryDto>> GetCategoriesAsync();
        Task<EquipmentCategoryDto> CreateCategoryAsync(CreateEquipmentCategoryDto dto);
        Task<EquipmentCategoryDto?> UpdateCategoryAsync(int id, UpdateEquipmentCategoryDto dto);
        Task<bool> DeleteCategoryAsync(int id);

        // Tag CRUD operations
        Task<IEnumerable<EquipmentTagDto>> GetTagsAsync();
        Task<EquipmentTagDto> CreateTagAsync(CreateEquipmentTagDto dto);
        Task<EquipmentTagDto?> UpdateTagAsync(int id, UpdateEquipmentTagDto dto);
        Task<bool> DeleteTagAsync(int id);
        Task<int> FixBlobUrlsAsync();
    }
}
